param([switch]$Stop, [switch]$Refresh)
$ErrorActionPreference = 'Stop'
$projectPath = Split-Path -Parent $PSScriptRoot
$stateDirectory = Join-Path $projectPath '.share'
$stateFile = Join-Path $stateDirectory 'session.json'
$toolDirectory = Join-Path $projectPath '.tools'
$tunnelPath = Join-Path $toolDirectory 'cloudflared.exe'

function Get-OwnedProcess($Entry) {
    if (-not $Entry) { return $null }
    $candidate = Get-Process -Id $Entry.ProcessId -ErrorAction SilentlyContinue
    if (-not $candidate) { return $null }
    try {
        $actualTicks = $candidate.StartTime.ToUniversalTime().Ticks.ToString([System.Globalization.CultureInfo]::InvariantCulture)
        $expectedTicks = if ($Entry.StartTicks) { [string]$Entry.StartTicks } elseif ($Entry.StartUtc -is [datetime]) { $Entry.StartUtc.ToUniversalTime().Ticks.ToString() } else { ([datetime]::Parse($Entry.StartUtc,[System.Globalization.CultureInfo]::InvariantCulture,[System.Globalization.DateTimeStyles]::RoundtripKind)).ToUniversalTime().Ticks.ToString() }
        # PID + exact creation time identify our process. Path can briefly be
        # unavailable while Windows is loading the executable or across users.
        if ($actualTicks -eq $expectedTicks -and (-not $candidate.Path -or $candidate.Path -eq $Entry.Path)) { return $candidate }
    } catch { return $null }
    return $null
}
function Get-ProcessEntry($Process, [string]$ExecutablePath) {
    return @{ ProcessId = $Process.Id; Path = $ExecutablePath; StartUtc = $Process.StartTime.ToUniversalTime().ToString('o'); StartTicks = $Process.StartTime.ToUniversalTime().Ticks.ToString([System.Globalization.CultureInfo]::InvariantCulture) }
}
function Stop-Session($Session) {
    foreach ($entry in @($Session.Tunnel, $Session.Server)) {
        $owned = Get-OwnedProcess $entry
        if ($owned) { Stop-Process -Id $owned.Id }
    }
}
$previous = if (Test-Path -LiteralPath $stateFile) { Get-Content -LiteralPath $stateFile -Raw | ConvertFrom-Json } else { $null }
if ($Stop) {
    if ($previous) { Stop-Session $previous; Remove-Item -LiteralPath $stateFile }
    Write-Output 'Sharing stopped. / Da tat link chia se.'
    exit 0
}
$tunnelLog = if (Test-Path -LiteralPath (Join-Path $stateDirectory 'tunnel.log')) { (Get-Content -LiteralPath (Join-Path $stateDirectory 'tunnel.log') -Tail 80) -join "`n" } else { '' }
$expiredTunnel = $tunnelLog.LastIndexOf('Unauthorized: Tunnel not found') -gt $tunnelLog.LastIndexOf('Registered tunnel connection')
if ($previous -and $previous.Url -and (Get-OwnedProcess $previous.Tunnel) -and -not $Refresh -and -not $expiredTunnel) {
    Write-Output "LINK: $($previous.Url)"
    Write-Output 'Stop sharing: npm.cmd run share:stop'
    exit 0
}
# A running cloudflared process can keep retrying after its remote quick tunnel
# expires. Renew only that tunnel and keep the existing local website running.
$preservedServer = if ($previous -and (Get-OwnedProcess $previous.Server)) { $previous.Server } else { $null }
if ($previous) {
    $ownedTunnel = Get-OwnedProcess $previous.Tunnel
    if ($ownedTunnel) { Stop-Process -Id $ownedTunnel.Id }
}
New-Item -ItemType Directory -Path $toolDirectory,$stateDirectory -Force | Out-Null

# Portable official release; verify against its published GitHub SHA-256.
$expectedHash = '2493dbc168923bb3e59e5e7716f71deced92992eea9acd6e9d74f84ac7751343'
if (-not (Test-Path -LiteralPath $tunnelPath)) {
    Write-Output 'Downloading official Cloudflare tunnel tool...'
    $ProgressPreference = 'SilentlyContinue'
    Invoke-WebRequest -Uri 'https://github.com/cloudflare/cloudflared/releases/download/2026.10.7/cloudflared-windows-amd64.exe' -OutFile $tunnelPath -UseBasicParsing
}
if ((Get-FileHash -LiteralPath $tunnelPath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $expectedHash) { throw 'cloudflared checksum does not match the official release.' }

$session = @{ Server = $preservedServer; Tunnel = $null; Url = $null }
try {
    $response = $null
    try { $response = Invoke-WebRequest -Uri 'http://127.0.0.1:4173' -UseBasicParsing -TimeoutSec 3 } catch {}
    if ($response -and $response.Content -notmatch 'VNScape') { throw 'Port 4173 belongs to another application. Stop it before sharing VNScape.' }
    if (-not $response) {
        $nodePath = (Get-Command node.exe).Source
        $serverFile = Join-Path $projectPath 'server.mjs'
        $serverProcess = Start-Process -FilePath $nodePath -ArgumentList @('"' + $serverFile + '"') -WorkingDirectory $projectPath -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $stateDirectory 'server.log') -RedirectStandardError (Join-Path $stateDirectory 'server-error.log')
        $session.Server = Get-ProcessEntry $serverProcess $nodePath
        $session | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $stateFile -Encoding UTF8
        for ($attempt = 0; $attempt -lt 20; $attempt++) {
            Start-Sleep -Milliseconds 250
            try { $response = Invoke-WebRequest -Uri 'http://127.0.0.1:4173' -UseBasicParsing -TimeoutSec 2; break } catch {}
        }
        if (-not $response -or $response.Content -notmatch 'VNScape') { throw 'VNScape server could not start.' }
    }
    $tunnelProcess = Start-Process -FilePath $tunnelPath -ArgumentList @('tunnel','--no-autoupdate','--protocol','http2','--url','http://127.0.0.1:4173') -WorkingDirectory $projectPath -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $stateDirectory 'tunnel-output.log') -RedirectStandardError (Join-Path $stateDirectory 'tunnel.log')
    $session.Tunnel = Get-ProcessEntry $tunnelProcess $tunnelPath
    $session | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $stateFile -Encoding UTF8
    for ($attempt = 0; $attempt -lt 120; $attempt++) {
        Start-Sleep -Milliseconds 500
        $log = Get-Content -LiteralPath (Join-Path $stateDirectory 'tunnel.log') -Raw -ErrorAction SilentlyContinue
        if ($log -match 'https://[a-z0-9-]+\.trycloudflare\.com') {
            $session.Url = $Matches[0]
            $session | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $stateFile -Encoding UTF8
            if ($log -match 'Registered tunnel connection') {
                Write-Output "LINK: $($session.Url)"
                Write-Output 'Keep this computer awake and connected to the Internet.'
                Write-Output 'Stop sharing: npm.cmd run share:stop'
                exit 0
            }
        }
        # Use the process handle returned by Start-Process during startup.
        # A metadata lookup failing is not evidence that this process exited.
        $tunnelProcess.Refresh()
        if ($tunnelProcess.HasExited) { throw "Tunnel exited with code $($tunnelProcess.ExitCode). See .share/tunnel.log. $log" }
    }
    throw 'Cloudflare did not establish a tunnel within 60 seconds. See .share/tunnel.log.'
} catch {
    if ($tunnelProcess -and -not $tunnelProcess.HasExited) { $tunnelProcess.Kill(); $tunnelProcess.WaitForExit() }
    if ($serverProcess) {
        $ownedServer = Get-OwnedProcess $session.Server
        if ($ownedServer) { Stop-Process -Id $ownedServer.Id }
        $session.Server = $null
    }
    $session.Tunnel = $null
    $session.Url = $null
    if ($session.Server -and (Get-OwnedProcess $session.Server)) {
        $session | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $stateFile -Encoding UTF8
    } elseif (Test-Path -LiteralPath $stateFile) { Remove-Item -LiteralPath $stateFile }
    throw
}
