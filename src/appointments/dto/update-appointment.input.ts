import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAppointmentInput {
  @Field()
  id: string;

  @Field()
  note: string;
}
