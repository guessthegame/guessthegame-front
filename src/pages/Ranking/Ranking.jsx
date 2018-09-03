import React from 'react';
import { connect } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import userService from '../../services/userService';
import './Ranking.css';

function mapStoreToProps(store) {
  return {
    user: store.user,
  };
}
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      scores: [],
    };
    userService.fetchScores().then(scores => {
      this.setState({ scores, isLoading: false });
    });
  }

  renderScores() {
    const { scores } = this.state;

    if (this.state.isLoading) {
      return <Loading />;
    }

    return (
      <div className="RankingPage_ranking">
        <div className="RankingPage_ranking_row">
          <div className="RankingPage_ranking_col -name" />
          <div className="RankingPage_ranking_col -solved">Solved</div>
          <div className="RankingPage_ranking_col -posted">Posted</div>
        </div>
        {scores.map((score, i) => (
          <div className="RankingPage_ranking_row">
            <div className="RankingPage_ranking_col -name">
              <span className="RankingPage_ranking_nb">{iToRank(i)}</span>{' '}
              <span className="RankingPage_ranking_username">
                {score.username}
              </span>
            </div>
            <div className="RankingPage_ranking_col -solved">
              {score.screenshotsFound}
            </div>
            <div className="RankingPage_ranking_col -posted">
              {score.screenshotsAdded}
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return <section className="RankingPage">{this.renderScores()}</section>;
  }
}
export default connect(mapStoreToProps)(Homepage);

function iToRank(i) {
  const rank = i + 1;
  return rank + rankToText(rank);
}

function rankToText(rank) {
  if (rank % 10 === 1 && rank !== 11) {
    return 'st';
  }
  if (rank % 10 === 2 && rank !== 12) {
    return 'nd';
  }
  if (rank % 10 === 3 && rank !== 13) {
    return 'rd';
  }
  return 'th';
}