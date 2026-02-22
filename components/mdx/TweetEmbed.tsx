interface TweetEmbedProps {
  tweetId: string;
}

export default function TweetEmbed({ tweetId }: TweetEmbedProps) {
  return (
    <div className="my-6 flex justify-center">
      <blockquote className="twitter-tweet" data-theme="light">
        <a href={`https://twitter.com/x/status/${tweetId}`} />
      </blockquote>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      />
    </div>
  );
}
