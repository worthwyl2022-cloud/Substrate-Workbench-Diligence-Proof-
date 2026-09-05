# Limitations and Claim Boundaries

## Current status

Cranium Core is a pre-revenue creative-governance prototype with a working architecture, illustrative project constitutions, a frozen 24-case corpus, and a deterministic evidence-artifact baseline. It is not evidence of enterprise-scale deployment, revenue, subscriptions, certified compliance, or independently audited security.

## Benchmark limitations

- The initial `npm run benchmark` command validates corpus/receipt reproducibility, not live LLM accuracy.
- Its baseline adapter intentionally returns expected labels and therefore must not be cited as detection-performance proof.
- `npm run benchmark:engine` evaluates deterministic rule coverage against the frozen corpus only. It does not test semantic generalization, paraphrase robustness beyond the encoded rules, or LLM judge behavior.
- Static values or narrative examples in the UI are not automatically empirical measurements.
- A real-model benchmark must retain raw configuration, model identity, prompts, state hashes, actual outputs/verdicts, timing, and signed result artifacts.
- The current corpus is finite. A successful run does not establish robust behavior on unknown paraphrases, unseen adversarial strategies, or long multi-turn contexts.

## Security limitations

The software-level authority and quarantine boundaries do not defend against compromised operating systems, malicious dependencies, browser compromise, host memory extraction, credential theft outside the application boundary, or unreviewed server implementations. SHA-256 receipts establish artifact integrity when correctly generated and retained; they do not make an application immutable.

## Product limitations

No claim is made that the prototype eliminates hallucinations, prevents all jailbreaks, guarantees canon fidelity, or is superior to RAG in general. Those claims require a specified comparison protocol and independently repeatable measurements.

## Legal notice

This document is technical documentation, not legal, security, compliance, or investment advice. Consult qualified counsel before public disclosure, licensing, patent filing, or reliance on intellectual-property claims.
