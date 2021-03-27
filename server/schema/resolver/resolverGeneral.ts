import { Ctx, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { MiddlewareGraphql } from '../../middleware/middlewareGraphql';
import { GeneralQueryResponse } from '../query/QueryGeneral';
import { GeneralService } from '../service/generalService';

@Service()
@Resolver()
export class GeneralResolver {
  constructor(private service: GeneralService) {}

  @Query(() => GeneralQueryResponse)
  async general(
    @Ctx() { req }: MiddlewareGraphql
  ): Promise<GeneralQueryResponse> {
    console.log(req);
    return this.service.general();
  }
}
