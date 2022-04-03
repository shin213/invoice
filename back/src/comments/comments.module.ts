import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsResolver } from './comments.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './comment'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { CognitoModule } from 'src/aws/cognito/cognito.module'

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), InvoicesModule, CognitoModule],
  providers: [CommentsService, CommentsResolver],
  exports: [CommentsModule, CommentsService, TypeOrmModule],
})
export class CommentsModule {}
