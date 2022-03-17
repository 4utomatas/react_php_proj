/**
 * A model for database object Paper
 * @constructor is passed a whole row from results and sets field values to the Paper object
 * @author Matas Pugzlys w19006600
 */
export default class Paper {
    constructor(data) {
        if (data != null) {
            this.id =
                data.paper_id != null && !isNaN(Number(data.paper_id)) ? Number(data.paper_id) : 0;
            this.title = data.title != null ? data.title : "";
            this.abstract = data.abstract != null ? data.abstract : "";
            this.doi = data.doi != null ? data.doi : "";
            this.video = data.video != null ? data.video : "";
            this.preview = data.preview != null ? data.preview : "";
            this.awardIds = data.awards != null ? data.awards.split(",").map((el) => +el) : [];
            this.isInReadingList =
                data.is_in_readinglist != null ? data.is_in_readinglist === "1" : null;
            this.authors = data.authors != null ? data.authors : "";
        }
    }
}
