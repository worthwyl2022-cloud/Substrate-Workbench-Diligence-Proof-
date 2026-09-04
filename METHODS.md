# Benchmark Methods

## Purpose

The benchmark harness establishes a reproducible evidence-artifact workflow for Cranium Core's frozen 24-case corpus. It makes corpus membership, verdict labels, run identity, and output integrity inspectable.

## Corpus

The frozen corpus is defined in `src/data.ts` as `FROZEN_BENCHMARK_CORPUS`. Cases span direct contradiction, indirect gaslighting, coercion, secret disclosure, environmental canon, adversarial paraphrase, prompt injection, authority escalation, memory poisoning, isolation, replay, integrity, malformed input, concurrency, and Aetherius axioms.

Expected labels are evaluation baselines only. A compliant live evaluator must not consume an expected label while deciding a case.

## Two benchmark modes

### 1. Baseline integrity check (`npm run benchmark`)

`scripts/run-benchmark.mjs` generates a deterministic baseline artifact. It verifies that every declared case is present and that output receipts and artifact hashes are generated reproducibly. The current adapter reports the expected label as a baseline verdict by design. Therefore its accuracy number is a **corpus-pipeline validation result**, **not** evidence of live governance detection quality.

### 2. Deterministic engine execution (`npm run benchmark:engine`)

`scripts/run-benchmark-engine.mjs` invokes the actual deterministic substrate gate logic (a Node-port of the `runNliProxyPrefilter` rules from `substrateEngine.ts`). For each case it:

- Loads the correct project constitution.
- Evaluates the test prompt against the rule set **without ever reading the expected label**.
- Produces an actual deterministic verdict (PROTECT/PASS).
- Records NLI proxy score, flagged keywords, latency, and a SHA-256 receipt.
- Exports a result artifact labeled `deterministic-engine`.

This measures the **rule-coverage accuracy** of the deterministic gate against the frozen corpus. It does not call any external LLM and must not be presented as a semantic generalization or live-model performance result.

## Live-evaluation acceptance criteria

A result may be labeled an empirical live-execution measurement only when the artifact retains, for each case:

- Input prompt and frozen corpus version.
- Pre-execution constitution/state hash.
- Actual final verdict produced without access to expected label.
- NLI/proxy and advisory-judge scores, including judge identity and configuration.
- Measured latency.
- Post-execution state hash and receipt digest.
- Remediation and second-pass audit status when a case is protected.

## Integrity

Each artifact is serialized deterministically and receives a SHA-256 sidecar. A verifier can hash the JSON file and compare it against the sidecar. This establishes file integrity only; it does not prove an external LLM's ethical quality, infrastructure security, or real-world safety.
