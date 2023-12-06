import * as constant from "./entity/Constant.js"
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
      case constant.MASTODON_SOCIAL:
        return [new MastodonFetcher(), new MastodonDisplay()];
        break;
      default:
        throw new Error("Wrong instance")
    }
  }
}
