export interface SubProcessor {
    name: string
    purpose: string
    location: string
}

/**
 * Disclosed sub-processors. Enterprise buyers ask for this list first, and
 * naming third parties that touch client data is a disclosure obligation, not
 * a courtesy. Keep it accurate — update whenever the stack changes.
 */
export const subProcessors: readonly SubProcessor[] = [
    {
        name: 'Anthropic, PBC',
        purpose: 'Large language model inference for assistant and document-processing workflows',
        location: 'United States',
    },
    {
        name: 'OpenAI, L.L.C.',
        purpose: 'Large language model and embedding inference where a project specifies it',
        location: 'United States',
    },
    {
        name: 'Meta Platforms (WhatsApp Business Platform)',
        purpose: 'Delivery of WhatsApp messages in messaging workflows',
        location: 'United States / Ireland',
    },
    {
        name: 'n8n GmbH (self-hosted or n8n Cloud)',
        purpose: 'Workflow orchestration and execution logs',
        location: 'Germany, or the client’s own infrastructure when self-hosted',
    },
    {
        name: 'Vercel Inc.',
        purpose: 'Hosting and delivery of this website and its contact endpoint',
        location: 'United States',
    },
    {
        name: 'Google LLC (Workspace)',
        purpose: 'Business email and document storage for enquiries and project files',
        location: 'United States',
    },
]

/**
 * Sub-processors engaged for a specific client build are listed in that
 * client's data-processing agreement rather than here.
 */
export const SUBPROCESSOR_NOTE =
    'Where a project is deployed into a client’s own cloud accounts and API keys, the client is the controller of that infrastructure and AvlokAI does not retain a copy of the processed data.'
