import { FileSystemDao } from "./daos/FileSystemDao";
import { MySqlDao } from "./daos/MySqlDao";
import { SqliteDao } from "./daos/SqliteDao";
import { MongoDbDao } from "./daos/MongoDbDao";
import { MongoDbaaSDao } from "./daos/MongoDbaaSDao";
import { FirebaseDao } from "./daos/FirebaseDao";
import { IDao } from "./interface/daos/IDao";

export class DaoFactory {
  getDao(option: number): IDao {
    switch (option) {
      case 1:
        return new FileSystemDao();
        break;
      case 2:
        return new MySqlDao();
        break;
      case 3:
        return new SqliteDao();
        break;
      case 4:
        return new MongoDbDao();
        break;
      case 5:
        return new MongoDbaaSDao();
        break;
      case 6:
        return new FirebaseDao();
        break;
      default:
        return new FileSystemDao();
        break;
    }
  }
};