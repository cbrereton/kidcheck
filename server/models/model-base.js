"use strict";
!function() {

    // The base class for all model objects
    class ModelBase {
        
        // Constructs an instance of this class
        // data: (optional) a POJO containing relevant fields retrieved from the database
        constructor(data) {
            if(data) {
                this.id = data.id;
                this.created = data.created;
                this.modified = data.modified;
            }
            else {
                this.id = 0;
                this.created = ~~(new Date().getTime() / 1000);
                this.modified = ~~(new Date().getTime() / 1000);
            }
        }

        // Generates a string representation of this object, ex: [ModelBase #0]
        toString() {
            return `[${this.constructor.name} #${this.id}]`;
        }

        // Updates the "modified" timestamp to the current time and returns the value
        touch() {
            return this.modified = ~~(new Date().getTime() / 1000);
        }

        // Validates the data fields of this object.
        // errors: (optional) any pre-existing errors (from sub-classes) to include in validation
        // returns: an array of (formatted) errors or an empty array if none exist
        validate(errors) {
            return (errors || []).concat([
                (!this['id'] && this['id'] !== 0) ? 'Model "id" is missing, data integrity error.' : null,
                (!this['created']) ? 'Model "created" timestamp is missing, data integrity error.' : null,
                (!this['modified']) ? 'Model "modified" timestamp is missing, data integrity error.' : null
            ]).filter(i => { return i !== null });
        }
    }

    module.exports = ModelBase;
}();
