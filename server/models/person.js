"use strict";
!function() {
    let ModelBase = require('./model-base'),
        birthdayFormat = /^[12]\d{3}-[01]\d-[0123]\d$/; //yyy-mm-dd with range checks, ex: matches 2000-01-01 but not 4000-50-70

    // A class that represents a person
    class Person extends ModelBase {

        // Constructs an instance of this class
        // data: (optional) a POJO containing relevant fields retrieved from the database
        constructor(data) {
            super(data);

            if(data) {
                this.firstName = data.firstName;
                this.lastName = data.lastName;
                this.middleInitial = data.middleInitial;
                this.gender = data.gender;
                this.birthday = data.birthday;
            }
            else {
                this.firstName = null;
                this.lastName = null;
                this.middleInitial = null;
                this.gender = null;
                this.birthday = null;
            }
        }

        // Gets the full name of this person object. Formatted as either First M. Last or First Last depending on whether "middleInitial" is provided
        getFullName() {
            return `${this.firstName} ${this.middleInitial ? this.middleInitial + '. ' : ''}${this.lastName}`;
        }

        // Gets a string representation of this object, ex: [Person #123 "Caleb A. Everett"]
        toString() {
            return `[${this.constructor.name} #${this.id} "${this.getFullName()}"]`;
        }

        // Validates the data fields of this object.
        // errors: (optional) any pre-existing errors (from sub-classes) to include in validation
        // returns: an array of (formatted) errors or an empty array if none exist
        validate(errors) {
            return super.validate((errors || []).concat([
                (!this['firstName']) ? 'First name is required' : null,
                (!this['lastName']) ? 'Last name is required' : null,
                (this['middleInitial'] && this['middleInitial'].length !== 1) ? 'Middle initial must be only one letter if provided' : null,
                (this['gender'] !== 'male' && this['gender'] !== 'female') ? 'Gender must be "male" or "female"' : null,
                (!this['birthday'] || !this['birthday'].match(birthdayFormat)) ? 'Birthday is required and must be formatted "yyyy-mm-dd"' : null
            ]));
        }
    }

    module.exports = Person;
}();
