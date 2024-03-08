import { container } from 'tsyringe'
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider'
import { IDateProvider } from './DateProvider/IDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStoregeProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
)

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
)

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  LocalStorageProvider
)