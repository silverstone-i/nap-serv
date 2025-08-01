'use strict';

/*
 * Copyright © 2024-present, Ian Silverstone
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function loadViews(db, schemaName, modulesDir = path.join(__dirname, '../../modules')) {
  if (schemaName === 'admin') {
    console.warn('⚠️ Admin schema does not support custom views. Skipping view loading.');
    return;
  }

  const modules = fs.readdirSync(modulesDir);

  for (const mod of modules) {
    const viewsPath = path.join(modulesDir, mod, 'sql', 'views');
    if (!fs.existsSync(viewsPath)) continue;

    const viewFiles = fs.readdirSync(viewsPath).filter(f => f.endsWith('.sql'));

    for (const file of viewFiles) {
      const setSchemaSQL = schemaName ? `SET search_path TO ${schemaName};\n` : '';
      const sql = setSchemaSQL + fs.readFileSync(path.join(viewsPath, file), 'utf8');
      console.log(`⏳ Loading view: ${mod}/sql/views/${file}`);
      try {
        await db.none(sql);
        console.log(`✅ Loaded view: ${file}`);
      } catch (err) {
        console.error(`❌ Failed to load view ${file}:`, err.message);
        throw err;
      }
    }
  }
}
