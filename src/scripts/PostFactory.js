import * as constant from "./consts.js"
import { LemmyFetcher } from "./fecther/LemmyFetcher.js";
import { LemmyDisplay } from "./display/LemmyDisplay.js";
import { MastodonFetcher } from "./fecther/MastodonFetcher.js";
import { MastodonDisplay } from "./display/MastodonDisplay.js";

export class PostFactory {
    static getPostByInstance(instance) {
      switch (instance) {
        case constant.LEMMY:
          return [new LemmyFetcher(), new LemmyDisplay()];
          break;
        default:
          throw new Error("Wrong instance")
      }
    }
}
