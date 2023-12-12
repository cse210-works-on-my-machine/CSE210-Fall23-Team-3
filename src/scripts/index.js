import "./entity/Post.js";

import { LemmyFetcher } from "./fetchers/LemmyFetcher.js";
import { LemmyPostBuilder } from "./postBuilder/LemmyPostBuilder.js";
import { MastodonFetcher } from "./fetchers/MastodonFetcher.js";
import { MastodonPostBuilder } from "./postBuilder/MastodonPostBuilder.js";
import { buildPage } from "./pageBuilder.js";

const HANDLERS = {
    lemmy: { fetcher: LemmyFetcher, postBuilder: LemmyPostBuilder },
    mastodon: { fetcher: MastodonFetcher, postBuilder: MastodonPostBuilder },
};

document.addEventListener("DOMContentLoaded", async function () {
    // Build the page and defer loadings
    buildPage(HANDLERS);
});
