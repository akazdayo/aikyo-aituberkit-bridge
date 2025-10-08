import { kyokoCompanionCard, kyokoHistory } from "./cards/kyoko";
import { createCompanionServer } from "./utils/companion";
import { createFirehoseServer } from "./utils/firehose";

(async () => {
  createCompanionServer([kyokoCompanionCard], [kyokoHistory]);
  createFirehoseServer(8001, "companion_kyoko");
  createFirehoseServer(8080, "companion_aya");
})();
