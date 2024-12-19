import { ErrorView } from '~/components/error-view';
import { ButtonLink } from '~/components/ui/button';

export default function NotFound() {
  return (
    <ErrorView type="404">
      <ButtonLink href="/" size="large">
        Go Back Home
      </ButtonLink>
    </ErrorView>
  );
}
