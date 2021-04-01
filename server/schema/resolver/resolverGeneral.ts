import { Authorized, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { GeneralQueryResponse } from '../query/QueryGeneral';
import { GeneralService } from '../service/generalService';

@Service()
@Resolver()
export class GeneralResolver {
  constructor(private service: GeneralService) {}

  @Query(() => GeneralQueryResponse)
  async general(): Promise<GeneralQueryResponse> {
    return this.service.general();
  }

  @Query(() => String)
  async generalTest(): Promise<String> {
    return 'hello worlds';
  }
}
