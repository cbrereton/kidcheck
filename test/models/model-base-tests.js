"use strict";
!function() {
    let assert = require('assert'),
        ModelBase = require('../../server/models/model-base.js');

    class ModelBaseChildClass extends ModelBase {
        constructor(data) {
            super(data);
        }
    }

    describe('ModelBase', () => {
        describe('#constructor', () => {
            it('should create a new object if no data is passed in', done => {
                let timeStamp = ~~(new Date().getTime() / 1000),
                    user = new ModelBase();

                assert(user);
                assert(user['id'] === 0);
                assert(user['created'] >= timeStamp);
                assert(user['modified'] >= timeStamp);
                done();
            });

            it('should copy data from a generic "data" object (i.e. DB row) if passed in', done => {
                let timeStamp = ~~(new Date().getTime() / 1000),
                    user = new ModelBase({
                        id: 123,
                        created: 123,
                        modified: 123
                    });

                assert(user);
                assert(user['id'] === 123);
                assert(user['created'] === 123);
                assert(user['modified'] === 123);
                done();
            });
        });

        describe('#toString', () => {
            it('should print the appropriate string with derived class names', done => {
                let user = new ModelBase(),
                    derivedUser = new ModelBaseChildClass();

                assert(user);
                assert(derivedUser);
                assert(user['id'] === 0);
                assert(derivedUser['id'] === 0);
                assert(user.toString() === '[ModelBase #0]');
                assert(derivedUser.toString() === '[ModelBaseChildClass #0]');
                done();
            });
        });

        describe('#touch', () => {
            it('should update the "modified" timestamp but NOT the "created" one', done => {
                let timeStamp = ~~(new Date().getTime() / 1000),
                    user = new ModelBase({
                        id: 123,
                        created: 123,
                        modified: 123
                    });

                assert(user);
                assert(user['created'] === 123);
                assert(user['modified'] === 123);
                user.touch();
                assert(user['created'] === 123);
                assert(user['modified'] >= timeStamp);
                done();
            });
        });

        describe('#validate', () => {
            it('should return an empty array if there are no errors', done => {
                let user = new ModelBase(),
                    errors = user.validate();

                assert(user);
                assert(errors && errors.length === 0);
                done();
            });

            it('should return 3 errors if the "id", "created", and "modified" fields are set to null', done => {
                let user = new ModelBase();

                user.id = null;
                user.created = null;
                user.modified = null;

                assert(user.validate().length === 3);
                done();
            });

            it('should pass any errors through that are passed to it', done => {
                let user = new ModelBase();

                assert(user.validate(['An error!']).length === 1);
                done();
            });

            it('should not pass null errors through that are passed to it', done => {
                let user = new ModelBase();

                assert(user.validate([null]).length === 0);
                done();
            });
        });
    });
}();
