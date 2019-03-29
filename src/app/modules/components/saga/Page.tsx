import Link from 'next/link';
import { connect } from 'react-redux';
import { ITestState } from '../../../shared/redux/reducers/test.reducer';
import Counter from './Counter';
import Clock from './Clock';

interface IPageProps {
  NavigateTo: string;
  linkTo: string;
  title: string;
}

const mapStateToProps = (state: any) => {
  return state.test;
};

const Page: React.SFC<IPageProps & ITestState> = ({
  error,
  lastUpdate,
  light,
  linkTo,
  NavigateTo,
  placeholderData,
  title
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <Clock lastUpdate={lastUpdate} light={light} />
      <Counter />
      <nav>
        <Link href={linkTo}>
          <a>Navigate: {NavigateTo}</a>
        </Link>
      </nav>
      {placeholderData && (
        <pre>
          <code>{JSON.stringify(placeholderData, null, 2)}</code>
        </pre>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
};

export default connect<ITestState>(mapStateToProps)(Page);
