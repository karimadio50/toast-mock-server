import { ApiProperty } from '@nestjs/swagger';

export class WageOverrideResponseDto {
  @ApiProperty({ example: 20 })
  wage: number;

  @ApiProperty()
  jobReference: {
    guid: string;
    entityType: string;
    externalId?: string;
  };
}

export class EmployeeResponseDto {
  @ApiProperty({ example: 'empeast000000001' })
  guid: string;

  @ApiProperty({ example: 'Employee' })
  entityType: string;

  @ApiProperty({ example: 'east-emp-1', required: false })
  externalId?: string;

  @ApiProperty({ example: '2019-08-24T14:15:22Z' })
  createdDate: string;

  @ApiProperty({ example: '2019-08-24T14:15:22Z' })
  modifiedDate: string;

  @ApiProperty({ example: '2019-08-24T14:15:22Z', required: false })
  deletedDate?: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Johnny', required: false })
  chosenName?: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com', required: false })
  email?: string;

  @ApiProperty({ example: '555-0101', required: false })
  phoneNumber?: string;

  @ApiProperty({ example: 'US', required: false })
  phoneNumberCountryCode?: string;

  @ApiProperty({ example: '1234', required: false })
  passcode?: string;

  @ApiProperty({ example: 'EMP001', required: false })
  externalEmployeeId?: string;

  @ApiProperty({ example: false })
  deleted: boolean;

  @ApiProperty({ isArray: true })
  jobReferences: {
    guid: string;
    entityType: string;
    externalId?: string;
  }[];

  @ApiProperty({ type: WageOverrideResponseDto, isArray: true })
  wageOverrides: WageOverrideResponseDto[];

  @ApiProperty({ example: 'v2-guid', required: false })
  v2EmployeeGuid?: string;
}
