import type { Component } from 'svelte';

import Html5 from './Html5.svelte';
import StylingAssets from './StylingAssets.svelte';
import Typescript from './Typescript.svelte';
import IconsFavicons from './IconsFavicons.svelte';
import PnpmCi from './PnpmCi.svelte';
import Engines from './Engines.svelte';
import VitePackaging from './VitePackaging.svelte';
import NitroHono from './NitroHono.svelte';
import ProjectStructures from './ProjectStructures.svelte';
import MathAndMaps from './MathAndMaps.svelte';
import BinaryStreams from './BinaryStreams.svelte';
import DiscreteTransitions from './DiscreteTransitions.svelte';
import ResourceScopes from './ResourceScopes.svelte';
import Strategies from './Strategies.svelte';
import HydrationSerialization from './HydrationSerialization.svelte';
import CspTransitions from './CspTransitions.svelte';
import SchemaRpc from './SchemaRpc.svelte';
import RealtimeWebhooks from './RealtimeWebhooks.svelte';
import DatabasesOrm from './DatabasesOrm.svelte';
import RedisRatelimit from './RedisRatelimit.svelte';
import BetterAuth from './BetterAuth.svelte';
import StorageS3R2 from './StorageS3R2.svelte';
import PlatformsDeployment from './PlatformsDeployment.svelte';
import Testing from './Testing.svelte';
import SeoAnalytics from './SeoAnalytics.svelte';
import Monetization from './Monetization.svelte';
import SoftwareLicenses from './SoftwareLicenses.svelte';
import ContainersIac from './ContainersIac.svelte';
import DevEnvironments from './DevEnvironments.svelte';

export const simulators: Record<string, Component> = {
	html5: Html5,
	'styling-assets': StylingAssets,
	typescript: Typescript,
	'icons-favicons': IconsFavicons,
	'pnpm-ci': PnpmCi,
	engines: Engines,
	'vite-packaging': VitePackaging,
	'nitro-hono': NitroHono,
	'project-structures': ProjectStructures,
	'math-and-maps': MathAndMaps,
	'binary-streams': BinaryStreams,
	'discrete-transitions': DiscreteTransitions,
	'resource-scopes': ResourceScopes,
	strategies: Strategies,
	'hydration-serialization': HydrationSerialization,
	'csp-transitions': CspTransitions,
	'schema-rpc': SchemaRpc,
	'realtime-webhooks': RealtimeWebhooks,
	'databases-orm': DatabasesOrm,
	'redis-ratelimit': RedisRatelimit,
	'better-auth': BetterAuth,
	'storage-s3-r2': StorageS3R2,
	'platforms-deployment': PlatformsDeployment,
	testing: Testing,
	'seo-analytics': SeoAnalytics,
	monetization: Monetization,
	'software-licenses': SoftwareLicenses,
	'containers-iac': ContainersIac,
	'dev-environments': DevEnvironments
};
