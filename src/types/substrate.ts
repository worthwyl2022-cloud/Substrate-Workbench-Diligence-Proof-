/**
 * Cranium Core: Directive-Governed Cognitive Substrate Types
 * Represents the behavioral contract:
 * Intention -> Identity Gate -> Memory Permanence -> Conflict as Signal -> Directive-Driven Next Move
 */

export interface Directive {
  id: string;
  category: 'core_identity' | 'inviolable_canon' | 'prohibition' | 'stylistic_invariant';
  title: string;
  rule: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  rationale: string;
}

export interface CanonItem {
  id: string;
  title: string;
  content: string;
  permanenceLevel: 'INVIOLABLE' | 'STABLE' | 'EVOLVING';
  hash: string;
  lastUpdated: string;
}

export interface ImmuneIncident {
  id: string;
  timestamp: string;
  projectId: string;
  triggerPrompt: string;
  violatedDirective: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  actionTaken: 'REJECT_AND_REGENERATE' | 'AMEND_CONSTITUTION' | 'OVERWRITE_CANON' | 'DISMISS_FALSE_POSITIVE';
  adaptiveConstraintAdded?: string;
  auditHash: string;
}

export interface ProjectConstitution {
  id: string;
  projectId: string;
  name: string;
  version: string;
  hash: string;
  summary: string;
  directives: Directive[];
  canon: CanonItem[];
  immuneIncidents: ImmuneIncident[];
  adaptiveSteeringConstraints: string[];
}

export interface Project {
  id: string;
  name: string;
  domain: string;
  description: string;
  constitutionId: string;
}

export type GateVerdict = 'PASS' | 'WARN' | 'PROTECT';

export interface Pass2AuditRecord {
  evaluated: boolean;
  passed: boolean;
  confidence: number;
  residualBreachDetected: boolean;
  verdict: 'REMEDIATION_VERIFIED' | 'HARD_REJECT_FALLBACK';
  auditScore: number; // 0 - 100
  rationale: string;
  evaluatedAt: string;
  sha256Proof: string;
}

export interface ContradictionEvaluation {
  isContradiction: boolean;
  confidence: number; // 0.0 - 1.0
  verdict: GateVerdict;
  nliProxyScore: number; // 0.0 - 1.0 (heuristic fast prefilter)
  llmJudgeScore: number; // 0.0 - 1.0 (deep semantic LLM judge - advisory only)
  sovereignSubstrateDecision: 'CONFIRMED_PROTECT' | 'OVERRULED_BY_INVARIANT' | 'PERMITTED_PASS';
  violatedRuleId?: string;
  violatedRuleText?: string;
  rationale: string;
  suggestedSteering?: string;
  evaluatedAt: string;
  judgeEngine: 'gemini-3.8-flash' | 'fast-nli-substrate';
  pass2Audit?: Pass2AuditRecord;
}

export interface ImmunePromotionItem {
  id: string;
  evidenceId: string;
  timestamp: string;
  projectId: string;
  triggerPrompt: string;
  violatedDirective: string;
  proposedAdaptiveConstraint: string;
  provenance: string;
  poisoningRiskRating: 'LOW' | 'MEDIUM' | 'HIGH';
  antiPoisoningCheckPassed: boolean;
  antiPoisoningNotes: string;
  status: 'PROVISIONAL_EVIDENCE' | 'EVALUATED' | 'AUTHORIZED_PROMOTION' | 'QUARANTINED_POISON_SUSPECT';
  authorizedBy?: string;
  promotedAt?: string;
  cryptographicSignature?: string;
}

export interface QuarantineItem {
  id: string;
  projectId: string;
  timestamp: string;
  prompt: string;
  rawOutput: string;
  evaluation: ContradictionEvaluation;
  status: 'PENDING_REVIEW' | 'AUTO_REGENERATED' | 'HUMAN_AMENDED' | 'OVERWRITTEN' | 'DISMISSED';
  correctedOutput?: string;
  resolutionNote?: string;
  pass2Status?: 'VERIFIED' | 'FAILED';
  immunePromotion?: ImmunePromotionItem;
}

export interface ComparisonExecutionResult {
  id: string;
  timestamp: string;
  prompt: string;
  projectId: string;
  substrate: {
    intentUnderstood: string;
    identityGatePassed: boolean;
    initialOutput: string;
    prefilterTriggered: boolean;
    judgeTriggered: boolean;
    sovereigntyModel: 'SUBSTRATE_SOVEREIGN_AUTHORITY';
    verdict: GateVerdict;
    quarantineIntercepted: boolean;
    remediatedOutput: string;
    steeringApplied?: string;
    latencyMs: number;
    evaluation: ContradictionEvaluation;
    pass2Audit?: Pass2AuditRecord;
  };
  naiveRag: {
    retrievedChunks: string[];
    output: string;
    adheresToCanon: boolean;
    contradictionDetected: boolean;
    latencyMs: number;
    driftNotes: string;
  };
  vanillaLlm: {
    output: string;
    adheresToCanon: boolean;
    latencyMs: number;
    driftNotes: string;
  };
  auditSignature: string;
}

export interface BenchmarkScenario {
  id: string;
  name: string;
  category: 'CANON_CONTINUITY' | 'HARD_PROHIBITION' | 'LONG_HORIZON_DRIFT' | 'DECEPTIVE_PROMPTING' | 'MULTI_CLAUSE_TENSION';
  description: string;
  testPrompt: string;
  relevantCanonRule: string;
  expectedBehavior: string;
  sampleAdversarialAttack: string;
}

export interface BenchmarkRunRecord {
  id: string;
  scenarioId: string;
  scenarioName: string;
  timestamp: string;
  substrateAdherence: number; // percentage
  naiveRagAdherence: number; // percentage
  vanillaAdherence: number; // percentage
  substrateCaughtViolation: boolean;
  naiveRagCaughtViolation: boolean;
  substrateLatencyMs: number;
  naiveRagLatencyMs: number;
  rawSubstrateOutput: string;
  rawNaiveOutput: string;
  pass2Verified: boolean;
  sha256Receipt: string;
}

export type SecurityCriterionKey = 
  | 'detection' 
  | 'classification' 
  | 'containment' 
  | 'recovery' 
  | 'persistence' 
  | 'falsePositives' 
  | 'memoryPoisoningDefense' 
  | 'crossProjectContamination' 
  | 'authorityEscalation' 
  | 'replayDeterminism';

export interface SecurityCriterionEvaluation {
  key: SecurityCriterionKey;
  number: number;
  name: string;
  question: string;
  adversarialProbe: string;
  substrateBehavior: string;
  naiveRagBehavior: string;
  passed: boolean;
  score: number; // 0 - 100
  empiricalProofReceipt: string;
  rationale: string;
}

export interface DiligenceMoatItem {
  claim: string;
  reality: string;
  status: 'ESTABLISHED' | 'IN_PROGRESS' | 'KNOWN_GAP';
  verificationPath: string;
  playgroundProofNote: string;
}

export interface FrozenRegressionRunSummary {
  totalCycles: number;
  adversarialAttacksBlocked: number;
  legitimateTransitionsPassed: number;
  falseRejectionRate: number; // 0.0%
  canonRetentionRate: number; // 100.0%
  meanLatencyMs: number;
  frozenDatasetHash: string;
  runDate: string;
  modelsAudited: string[];
}

export interface AuthorityLadderTier {
  tier: number;
  label: string;
  privilege: string;
}

export interface MerkleProofStep {
  index: number;
  timestamp: string;
  action: string;
  preHash: string;
  postHash: string;
  operatorTier: number;
}

export interface DigitalSignatureBlock {
  algorithm: string;
  curve: string;
  signatureDerHex: string;
  keyId: string;
  publicKeyPem: string;
  attester: string;
  verificationStandard: string;
  status: string;
}

export interface FrozenBenchmarkAttestation {
  corpusFile: string;
  sampleCount: number;
  targetAccuracy: string;
  baselineComparison: {
    naiveRagAccuracy: string;
    relativeImprovement: string;
  };
  auditAttestation: string;
}

export interface CryptographicProofPack {
  specVersion: string;
  generator: string;
  timestamp: string;
  merkleRootHash: string;
  projectId: string;
  projectName: string;
  governanceContract: {
    authorityLadder: AuthorityLadderTier[];
    monotonicityInvariant: string;
  };
  constitutionSnapshot: Array<{
    id: string;
    domain: string;
    title: string;
    statement: string;
    tier: number;
    isImmutable: boolean;
    enforcement: string;
  }>;
  canonSnapshot: Array<{
    id: string;
    type: string;
    title: string;
    content: string;
    tier: number;
    tags: string[];
  }>;
  merkleProofChain: MerkleProofStep[];
  frozenBenchmarkAttestation: FrozenBenchmarkAttestation;
  packageIntegrityDigest: string;
  digitalSignatureBlock: DigitalSignatureBlock;
}

export interface FormalInvariant {
  id: string;
  code: string;
  name: string;
  category: 'AUTHORITY' | 'MEMORY' | 'SECURITY' | 'INTEGRITY' | 'ADAPTATION';
  formalStatement: string;
  mathematicalExpression: string;
  failureCondition: string;
  enforcementMechanism: string;
  verificationMethod: string;
}

export type EmbodimentAxis = 
  | 'ALTERNATIVE_IMPLEMENTATION'
  | 'ALTERNATIVE_PROCESSING_PATH'
  | 'ALTERNATIVE_STATE_REPRESENTATION'
  | 'ALTERNATIVE_ENFORCEMENT_MECHANISM'
  | 'ALTERNATIVE_MODEL_INTERFACE'
  | 'ALTERNATIVE_DEPLOYMENT_ARCHITECTURE';

export interface ArchitecturalEmbodiment {
  id: string;
  code: string;
  title: string;
  axis: EmbodimentAxis;
  status: 'CANONICAL_CORE' | 'VALIDATED_EMBODIMENT' | 'PROTOTYPE_SPEC' | 'INDEPENDENT_SYNTHESIS';
  summary: string;
  technicalMechanism: string;
  stateRepresentation: string;
  processingPipeline: string;
  deploymentTarget: string;
  advantages: string[];
  tradeOffs: string[];
  satisfiedInvariants: string[]; // List of FormalInvariant.code
  latencyProfile: string;
  computeRequirement: string;
  novelParaphraseResilience: 'LOW' | 'MEDIUM' | 'HIGH' | 'MAXIMUM';
  provenance: {
    origin: string;
    firstImplemented: string;
    commitAnchor: string;
    cleanRoomStatus: string;
  };
  sampleCodeOrSpec: string;
}

export interface EmbodimentEvaluationResult {
  embodimentId: string;
  embodimentTitle: string;
  gateVerdict: GateVerdict;
  contradictionScore: number;
  latencyMs: number;
  outputSummary: string;
  invariantsMaintained: boolean;
  actionTaken: string;
  auditTrail: string;
}

export interface DifferentialTestRun {
  id: string;
  prompt: string;
  targetDirective: string;
  timestamp: string;
  results: Record<string, EmbodimentEvaluationResult>;
}

export interface IpPerimeterPortfolio {
  specTitle: string;
  version: string;
  lastUpdated: string;
  canonicalCoreId: string;
  invariants: FormalInvariant[];
  embodiments: ArchitecturalEmbodiment[];
  developmentMilestones: Array<{
    date: string;
    version: string;
    milestone: string;
    architecturalImpact: string;
    provenanceHash: string;
  }>;
  legalGuidance: {
    copyrightScope: string;
    patentScope: string;
    tradeSecretScope: string;
    disclosureWarning: string;
  };
}

// ============================================================================
// COMPLETE RUNTIME VERIFICATION MANIFEST (Per-Execution Attestation Record)
// ============================================================================

export interface VerificationManifestExecutionRecord {
  testCaseId: string;
  category: string;
  inputDigest: string;
  inputExcerpt: string;
  initialStateDigest: string;
  actualGovernanceResult: 'PROTECT' | 'PASS';
  postExecutionStateDigest: string;
  canonicalLeafDigest: string;
  merkleRoot: string;
  merkleInclusionProof: {
    leafHash: string;
    leafIndex: number;
    path: Array<{ position: 'left' | 'right'; hash: string }>;
    calculatedRoot: string;
    verified: boolean;
  };
  signatureAlgorithm: string;
  publicKeyFingerprint: string;
  signature: string;
  verificationResult: 'VALID' | 'FAILED';
  executionTimestamp: string;
  latencyMs: number;
  advisoryLlmVerdict: 'PROTECT' | 'PASS';
  deterministicVerdict: 'PROTECT' | 'PASS';
  sovereignOverrideActive: boolean;
}

export interface VerificationManifest {
  manifestId: string;
  repositoryCommit: string;
  engineVersion: string;
  corpusVersion: string;
  constitutionIdentifier: string;
  constitutionDigest: string;
  generatedAt: string;
  totalExecutions: number;
  passedExecutions: number;
  overallAccuracyRate: string;
  meanLatencyMs: number;
  merkleRoot: string;
  manifestIntegrityDigest: string;
  executions: VerificationManifestExecutionRecord[];
  signatureBlock: {
    algorithm: string;
    curve: string;
    keyId: string;
    publicKeyPem: string;
    publicKeyFingerprint: string;
    signatureDerHex: string;
    attester: string;
    verified: boolean;
  };
  invariantChecklist: {
    rfc8785Canonicalization: boolean;
    sha256DigestMatch: boolean;
    merkleRootIntegrity: boolean;
    webCryptoSignatureValid: boolean;
    monotonicAuthorityEnforced: boolean;
    subordinateLlmInvariantEnforced: boolean;
  };
}

export type CorruptionVectorType = 
  | 'CORRUPT_INPUT_BYTE'
  | 'CORRUPT_STATE_FIELD'
  | 'CORRUPT_LEAF_HASH'
  | 'CORRUPT_MERKLE_SIBLING'
  | 'CORRUPT_SIGNATURE_BYTE';

export interface FivePointCorruptionVector {
  id: string;
  vectorType: CorruptionVectorType;
  label: string;
  targetComponent: string;
  tamperDescription: string;
  originalValueSnippet: string;
  tamperedValueSnippet: string;
  caughtByInvariant: string;
  verificationVerdict: 'FAILED_CLOSED' | 'UNCAUGHT_CORRUPTION';
  auditExplanation: string;
  reproductionLatencyMs: number;
}

export interface ImmunePoisoningAttackTestResult {
  testId: string;
  timestamp: string;
  adversarialTrojanPrompt: string;
  targetRuleToSubvert: string;
  quarantineIncidentId: string;
  quarantineStatus: 'INTERCEPTED_AND_QUARANTINED';
  attemptedPromotionTier: number;
  authorityValidationResult: 'REJECTED_UNAUTHORIZED_ESCALATION';
  antiPoisoningCheckPassed: boolean;
  poisoningRiskRating: 'HIGH';
  rejectionRationale: string;
  constitutionStateHashBefore: string;
  constitutionStateHashAfter: string;
  stateIdentical: boolean;
  verdict: 'DEFENSE_IN_DEPTH_PASSED';
  proofReceipt: string;
}

