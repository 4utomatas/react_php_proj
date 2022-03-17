/**
 * A model for database object Award
 * @constructor is passed a whole row from results and sets field values to the Award object
 * @author Matas Pugzlys w19006600
 */
export default class Award {
    constructor(data) {
        if (data != null) {
            this.id = data.id != null && !isNaN(Number(data.id)) ? Number(data.id) : 0;
            this.name = data.name != null ? data.name : "";
        }
    }
}
