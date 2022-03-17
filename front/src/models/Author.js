/**
 * A model for database object Author
 * @constructor is passed a whole row from results and sets field values to the Author object
 * @author Matas Pugzlys w19006600
 */
export default class Author {
    constructor(data) {
        if (data != null) {
            this.id =
                data.author_id != null && !isNaN(Number(data.author_id))
                    ? Number(data.author_id)
                    : 0;
            this.firstName = data.first_name != null ? data.first_name : "";
            this.middleName = data.middle_name != null ? data.middle_name : "";
            this.lastName = data.last_name != null ? data.last_name : "";
        }
    }
    /**
     * @returns concatenated name
     */
    getFullName() {
        let fullName = this.firstName !== "" ? this.firstName : "";
        if (this.middleName !== "") fullName += ` ${this.middleName}`;
        if (this.lastName !== "") fullName += ` ${this.lastName}`;
        return fullName;
    }
}
