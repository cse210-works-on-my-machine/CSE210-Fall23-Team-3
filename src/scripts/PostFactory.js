import * as constant from "./entity/Constant.js"
import { LemmyFetcher } from "./fetchers/LemmyFetcher.js";
import { LemmyPostBuilder } from "./postBuilder/LemmyPostBuilder.js";
import { MastodonFetcher } from "./fetchers/MastodonFetcher.js";
import { MastodonPostBuilder } from "./postBuilder/MastodonPostBuilder.js";

export class PostFactory {

  static getPostByInstance(instance) {
    switch (instance) {
      case constant.LEMMY:
        return [new LemmyFetcher(), new LemmyPostBuilder()];
      case constant.MASTODON_SOCIAL:
        return [new MastodonFetcher(), new MastodonPostBuilder()];
      default:
        throw new Error("Wrong instance")
    }
  }
}
