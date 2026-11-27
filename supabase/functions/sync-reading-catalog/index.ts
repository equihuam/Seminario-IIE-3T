import { decodeHTML } from 'npm:entities@6.0.1';
import { createCatalogSync } from './handler.mjs';

Deno.serve(createCatalogSync((name: string) => Deno.env.get(name), decodeHTML));
