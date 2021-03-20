import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { GeneralQueryResponse } from '../query/generalQuery';
import { GeneralServiceResponse } from '../service/generalService';

@Service()
@Resolver()
export class GeneralResolver {
  constructor(private service: GeneralServiceResponse) {}

  @Query(() => GeneralQueryResponse)
  async general(): Promise<GeneralQueryResponse> {
    return this.service.general();
  }
}
