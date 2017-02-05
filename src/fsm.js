class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {

        this.config = config;
        if (this.config == null ){

            throw  exception('Error');
        }
        this.state = this.config.initial ;
        this.states = this.config.states;
        this.transitions = this.config.states[this.state].transitions;

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {

      return  this.state;

    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {

        for( var property in this.config.states) {
            if(property == state){

                return  this.state = state;
        }
        }
        throw  exception('Error');
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

        for(var value in this.transitions) {
        if (value == event) {
            return (

                    (this.state = this.transitions[value]) &&
                    (this.transitions = this.states[this.state].transitions)

        );


        }
        }

        throw  exception('Error');
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {

      return  this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {

        var array = [];
        if(event ==null){
            for(var property in this.states){
                array.push(property);
            }

            return array;
        }
        else {
            for (var value in this.states) {
                this.state = value;
                this.transitions = this.states[this.state].transitions;
                for(var transit in this.transitions) {
                    if(transit == event) {
                        array.push(this.state);
                }
                }

            }
            return array;
        }

            }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.state == this.config.initial){

            return false;
        }


    }


    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
