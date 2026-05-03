import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetJobParamDto {
  @ApiProperty({
    description: 'The Toast platform GUID or an external identifier for the job.',
    example: 'east-cook',
  })
  @IsNotEmpty()
  @IsString()
  jobId: string;
}
