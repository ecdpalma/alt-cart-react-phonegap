import alt from '../alt'

class AltProductActions {

    receive(data) {
        this.dispatch(data);
    }

    select(index) {
        this.dispatch(index);
    }
}

export default alt.createActions(AltProductActions);
