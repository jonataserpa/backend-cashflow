import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';

import { SendNotification } from '@application/notification/use-cases/send-notification';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@application/notification/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@application/notification/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/notification/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/notification/use-cases/read-notification';
import { UnreadNotification } from '@application/notification/use-cases/unread-notification';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from '@application/user/use-cases/create-user';
import { CompanyController } from './controllers/company.controller';
import { CreateCompanyUseCase } from '@application/company/use-cases/create-company';
import { GetAllUserUseCase } from '@application/user/use-cases/get-all-user';
import { GetByIdUserUseCase } from '@application/user/use-cases/get-by-id-user';
import { UpdateUserUseCase } from '@application/user/use-cases/update-user';
import { RemoveUserUseCase } from '@application/user/use-cases/remove-user';
import { CreateCategorieUseCase } from '@application/categorie/use-cases/create-categorie';
import { GetAllCategorieUseCase } from '@application/categorie/use-cases/get-all-categorie';
import { GetByIdCategorieUseCase } from '@application/categorie/use-cases/get-by-id-categorie';
import { UpdateCategorieUseCase } from '@application/categorie/use-cases/update-categorie';
import { RemoveCategorieUseCase } from '@application/categorie/use-cases/remove-categorie';
import { CategorieController } from './controllers/categorie.controller';
import { UploadController } from './controllers/upload.controller';
import { CreateUploadUseCase } from '@application/upload/use-cases/create-upload-announcement';
import { RemoveUploadUseCase } from '@application/upload/use-cases/remove-upload';
import { BusinessController } from './controllers/business.controller';
import { GetAllCompanyUseCase } from '@application/company/use-cases/get-all-company';
import { GetByIdCompanyUseCase } from '@application/company/use-cases/get-by-id-company';
import { UpdateCompanyUseCase } from '@application/company/use-cases/update-company';
import { RemoveCompanyUseCase } from '@application/company/use-cases/remove-company';
import { CreateUploadUserUseCase } from '@application/upload/use-cases/create-upload-user';
import { CreateUploadProductUseCase } from '@application/upload/use-cases/create-upload-product';
import { ServiceController } from './controllers/service.controller';
import { CreateServiceUseCase } from '@application/service/use-cases/create-service';
import { GetAllServiceUseCase } from '@application/service/use-cases/get-all-service';
import { GetByIdServiceUseCase } from '@application/service/use-cases/get-by-id-service';
import { UpdateServiceUseCase } from '@application/service/use-cases/update-service';
import { RemoveServiceUseCase } from '@application/service/use-cases/remove-service';
import { ChatController } from './controllers/chat.controller';
import { SendChatUseCase } from '@application/chat/use-cases/send-chat';
import { OpenAiModule } from '@infra/open-ai/open-ai.module';
import { VideoController } from './controllers/video.controller';
import { SendVideoUseCase } from '@application/video/use-cases/send-video';
import { GetAllChatUseCase } from '@application/chat/use-cases/get-all-chat';
import { CashFlowController } from './controllers/cash-flow.controller';
import { CreateCashFlowUseCase } from '@application/cash-flow/use-cases/create-cash-flow';
import { GetAllCashFlowUseCase } from '@application/cash-flow/use-cases/get-all-cash-flow';
import { GetByIdCashFlowUseCase } from '@application/cash-flow/use-cases/get-by-id-cash-flow';
import { UpdateCashFlowUseCase } from '@application/cash-flow/use-cases/update-cash-flow';
import { RemoveCashFlowUseCase } from '@application/cash-flow/use-cases/remove-cash-flow';

@Module({
  imports: [DatabaseModule, OpenAiModule],
  controllers: [
    CompanyController,
    UserController,
    CategorieController,
    NotificationsController,
    UploadController,
    BusinessController,
    ServiceController,
    ChatController,
    VideoController,
    CashFlowController,
  ],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
    CreateUserUseCase,
    CreateCompanyUseCase,
    GetAllUserUseCase,
    GetByIdUserUseCase,
    UpdateUserUseCase,
    RemoveUserUseCase,
    CreateCategorieUseCase,
    GetAllCategorieUseCase,
    GetByIdCategorieUseCase,
    UpdateCategorieUseCase,
    RemoveCategorieUseCase,
    CreateUploadUseCase,
    RemoveUploadUseCase,
    GetAllCompanyUseCase,
    GetByIdCompanyUseCase,
    UpdateCompanyUseCase,
    RemoveCompanyUseCase,
    CreateUploadUserUseCase,
    CreateUploadProductUseCase,
    CreateServiceUseCase,
    GetAllServiceUseCase,
    GetByIdServiceUseCase,
    UpdateServiceUseCase,
    RemoveServiceUseCase,
    SendChatUseCase,
    SendVideoUseCase,
    GetAllChatUseCase,
    CreateCashFlowUseCase,
    GetAllCashFlowUseCase,
    GetByIdCashFlowUseCase,
    UpdateCashFlowUseCase,
    RemoveCashFlowUseCase,
  ],
})
export class HttpModule {}
