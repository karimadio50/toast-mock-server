import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetEmployeeParamDto {
  @ApiProperty({
    description: 'The Toast platform GUID or external identifier for the employee.',
    example: 'east-emp-1',
  })
  @IsNotEmpty()
  @IsString()
  employeeId: string;
}
