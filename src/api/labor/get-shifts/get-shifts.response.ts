import { ApiProperty } from '@nestjs/swagger';

export class ScheduleConfigDto {
  @ApiProperty({ example: 'guid' })
  guid: string;

  @ApiProperty({ example: 0, required: false })
  minBeforeClockIn?: number;

  @ApiProperty({ example: 0, required: false })
  minAfterClockIn?: number;

  @ApiProperty({ example: 0, required: false })
  minBeforeClockOut?: number;

  @ApiProperty({ example: 0, required: false })
  minAfterClockOut?: number;
}

export class ShiftResponseDto {
  @ApiProperty({ example: 'shifteast0000000001' })
  guid: string;

  @ApiProperty({ example: 'Shift', required: false })
  entityType?: string;

  @ApiProperty({ example: 'east-shift-1', required: false })
  externalId?: string;

  @ApiProperty({ example: '2019-08-24T14:15:22Z', required: false })
  createdDate?: string;

  @ApiProperty({ example: '2019-08-24T14:15:22Z', required: false })
  modifiedDate?: string;

  @ApiProperty({ example: '2019-08-24T14:15:22Z', required: false })
  deletedDate?: string;

  @ApiProperty({ example: false, required: false })
  deleted?: boolean;

  @ApiProperty()
  jobReference: {
    guid: string;
    entityType: string;
    externalId?: string;
  };

  @ApiProperty()
  employeeReference: {
    guid: string;
    entityType: string;
    externalId?: string;
  };

  @ApiProperty({ example: '2019-08-24T14:15:22Z' })
  inDate: string;

  @ApiProperty({ example: '2019-08-24T14:15:22Z' })
  outDate: string;

  @ApiProperty({ type: ScheduleConfigDto, required: false })
  scheduleConfig?: ScheduleConfigDto;
}
