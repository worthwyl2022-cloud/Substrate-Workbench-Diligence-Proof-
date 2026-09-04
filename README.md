# Cranium Core

Cranium Core is a prototype governance substrate for evaluating candidate text against project-specific constitutional rules, canon, and authority boundaries. It is positioned as a reproducible prototype and IP/architecture package—not as a production-hardened multi-tenant service.

## Quick start

```bash
npm install
npm run dev
```

## Reproducible benchmark artifact

```bash
npm run benchmark
```

The command writes a JSON result file and matching SHA-256 sidecar under `results/`. Set `BENCHMARK_RUN_ID` to make the output file name stable:

```bash
BENCHMARK_RUN_ID=baseline-001 npm run benchmark
```

The initial runner is explicitly a **deterministic baseline**: it validates the frozen 24-case corpus manifest and evidence-artifact workflow. It does not call an LLM and must not be presented as a live-model performance evaluation. Replace its adapter with the real substrate evaluator before recording empirical live-execution measurements.

## Evidence labels

- **Demonstrated**: behavior exercised in this repository.
- **Reference example**: illustrative/static architecture data.
- **Untested hypothesis**: claim requiring a defined future evaluation.
- **Empirical measurement**: value produced by an actual retained execution artifact.

See [METHODS.md](METHODS.md) and [LIMITATIONS.md](LIMITATIONS.md) before relying on benchmark results.
