$ErrorActionPreference = 'Stop'
$scriptPath = Join-Path (Split-Path -Parent $PSScriptRoot) 'scripts/share.ps1'
$parseTokens = $null; $parseErrors = $null
$ast = [System.Management.Automation.Language.Parser]::ParseFile($scriptPath,[ref]$parseTokens,[ref]$parseErrors)
if ($parseErrors.Count) { throw $parseErrors[0].Message }
foreach ($name in @('Get-OwnedProcess','Get-ProcessEntry','Stop-Session')) {
    $definition = $ast.Find({param($node) $node -is [System.Management.Automation.Language.FunctionDefinitionAst] -and $node.Name -eq $name},$true)
    . ([scriptblock]::Create($definition.Extent.Text))
}
$nodePath = (Get-Command node.exe).Source
$probe = Start-Process -FilePath $nodePath -ArgumentList @('-e','setTimeout(()=>{},20000)') -WindowStyle Hidden -PassThru
try {
    $entry = Get-ProcessEntry $probe $nodePath
    if (-not (Get-OwnedProcess $entry)) { throw 'A running process must be recognized immediately.' }
    $restored = $entry | ConvertTo-Json | ConvertFrom-Json
    if (-not (Get-OwnedProcess $restored)) { throw 'JSON round-trip must preserve process identity.' }
    $restored.StartTicks = ([long]$entry.StartTicks + 1).ToString()
    if (Get-OwnedProcess $restored) { throw 'A reused PID with a different creation time must be rejected.' }
    $legacy = @{ ProcessId=$entry.ProcessId; Path=$entry.Path; StartUtc=$entry.StartUtc }
    if (-not (Get-OwnedProcess $legacy)) { throw 'Legacy string timestamp must remain readable.' }
    $legacy.StartUtc = [datetime]::Parse($entry.StartUtc)
    if (-not (Get-OwnedProcess $legacy)) { throw 'DateTime timestamps must retain fractional seconds.' }
    Stop-Session @{ Tunnel=$entry; Server=$null }
    if (-not $probe.WaitForExit(3000)) { throw 'Stopping a session must stop its own process.' }
    Write-Output 'PASS: immediate identity, JSON persistence, stale-PID rejection, legacy timestamps and owned-process shutdown.'
} finally { if (-not $probe.HasExited) { $probe.Kill(); $probe.WaitForExit() } }
