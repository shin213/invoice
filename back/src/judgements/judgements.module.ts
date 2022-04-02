import { Module } from '@nestjs/common'
import { JudgementsService } from './judgements.service'
import { JudgementsResolver } from './judgements.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Judgement } from './judgement'
import { CommentsModule } from 'src/comments/comments.module'
import { RequestsModule } from 'src/requests/requests.module'
import { CognitoModule } from 'src/aws/cognito/cognito.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Judgement]),
    CognitoModule,
    RequestsModule,
    CommentsModule,
    JudgementsModule,
  ],
  providers: [JudgementsService, JudgementsResolver],
  exports: [JudgementsModule, JudgementsService, TypeOrmModule],
})
export class JudgementsModule {}
