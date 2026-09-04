# Cranium Core

Cranium Core is a prototype governance substrate for evaluating candidate text against project-specific constitutional rules, canon, and authority boundaries. It is positioned as a reproducible prototype and IP/architecture package—not as a production-hardened multi-tenant service.

## Quick start

```bash
npm install
npm run dev
```

## Reproducible benchmark artifacts

### Corpus manifest

```bash
npm run corpus:manifest
```

Generates `corpus/corpus-manifest.json` and its SHA-256 sidecar from the frozen 24-case corpus and project constitutions.

### Baseline integrity check

```bash
npm run benchmark
```

Writes a JSON result file and matching SHA-256 sidecar under `results/`. This validates corpus-and-artifact reproducibility; it does not evaluate the engine.

```bash
BENCHMARK_RUN_ID=baseline-001 npm run benchmark
```

### Deterministic engine evaluation

```bash
npm run corpus:manifest
npm run benchmark:engine
```

Runs the actual deterministic substrate gate against all 24 cases and exports a verified evidence artifact. Set a stable run ID:

```bash
BENCHMARK_RUN_ID=engine-001 npm run benchmark:engine
```

**Important**: This evaluates rule-coverage accuracy only. It does not call an external LLM and must not be cited as semantic generalization or live-model performance.

## Evidence labels

- **Demonstrated**: behavior exercised in this repository.
- **Reference example**: illustrative/static architecture data.
- **Untested hypothesis**: claim requiring a defined future evaluation.
- **Empirical measurement**: value produced by an actual retained execution artifact.

See [METHODS.md](METHODS.md) and [LIMITATIONS.md](LIMITATIONS.md) before relying on benchmark results.
