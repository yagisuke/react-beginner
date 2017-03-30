import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setRating(nextProps.defaultValue);
  }

  getValue() {
    return this.state.rating;
  }

  setTemp(rating) {
    this.setState({
      tmpRating: rating
    });
  }

  setRating(rating) {
    this.setState({
      tmpRating: rating,
      rating: rating,
    });
  }

  reset() {
    this.setTemp(this.getValue());
  }

  render() {
    const stars = [];
    for (let i = 1; i <= this.props.max; i++) {
      stars.push(
        <span
          className={i <= this.state.tmpRating ? 'RatingOn' : null}
          key={i}
          onClick={!this.props.readonly && this.setRating.bind(this, i)}
          onMouseOver={!this.props.readonly && this.setTemp.bind(this, i)}
        >
          &#9734;
        </span>
      );
    }
    return (
      <div
        className={classNames({
          'Rating': true,
          'RatingReadonly': this.props.readonly,
        })}
        onMouseOut={(event) => this.reset()}
      >
        {stars}
        {this.props.readonly || !this.props.id
          ? null
          : <input type="hidden" id={this.props.id} value={this.getValue()} />
        }
      </div>
    );
  }
}

Rating.propTypes = {
  defaultValue: PropTypes.number,
  readonly: PropTypes.bool,
  max: PropTypes.number,
};

Rating.defaultProps = {
  defaultValue: 0,
  readonly: false,
  max: 5,
};

export default Rating
