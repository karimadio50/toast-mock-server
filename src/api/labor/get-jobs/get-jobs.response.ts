import { ApiProperty } from '@nestjs/swagger';

export class JobResponseDto {
  @ApiProperty({ example: 'jobeastcook000000000001' })
  guid: string;

  @ApiProperty({ example: 'Job' })
  entityType: string;

  @ApiProperty({ example: 'east-cook', required: false })
  externalId?: string;

  @ApiProperty({ example: '2019-08-24T14:15:22Z' })
  createdDate: string;

  @ApiProperty({ example: '2019-08-24T14:15:22Z' })
  modifiedDate: string;

  @ApiProperty({ example: '2019-08-24T14:15:22Z', required: false })
  deletedDate?: string;

  @ApiProperty({ example: 'Cook' })
  title: string;

  @ApiProperty({ example: false })
  deleted: boolean;

  @ApiProperty({ example: 'HOURLY' })
  wageFrequency: string;

  @ApiProperty({ example: 18 })
  defaultWage: number;

  @ApiProperty({ example: false })
  tipped: boolean;

  @ApiProperty({ example: '102', required: false })
  code?: string;

  @ApiProperty({ example: false })
  excludeFromReporting: boolean;
}
