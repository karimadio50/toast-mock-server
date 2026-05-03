import { Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GetTokenService } from './get-token.service';
import { Public } from '@shared/decorators/is-public.decorator';

@Public()
@Controller('authentication/v1/authentication/login')
export class GetTokenController {
  constructor(private readonly service: GetTokenService) { }

  @Post()
  @ApiOperation({ summary: 'Get access token' })
  async getToken(): Promise<any> {
    return this.service.execute();
  }
}
