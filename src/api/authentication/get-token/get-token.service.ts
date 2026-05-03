import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GetTokenService {
  execute(): any {
    const accessPath = path.resolve(process.cwd(), 'src/mock-data/ToastMockData/access.json');
    if (fs.existsSync(accessPath)) {
      return JSON.parse(fs.readFileSync(accessPath, 'utf8'));
    }
    return { token: { accessToken: "MOCK_TOKEN" } };
  }
}
