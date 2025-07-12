const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

async function testAuth() {
    try {
        const client = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY,
            appSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessSecret: process.env.TWITTER_ACCESS_SECRET,
        });

        console.log('Testing authentication...');
        
        // Test read access
        const me = await client.v2.me();
        console.log('✅ Authentication successful!');
        console.log('User:', me.data.username);
        console.log('User ID:', me.data.id);
        
        // Test if we can post (write access)
        console.log('\nTesting write permissions...');
        const testTweet = await client.v2.tweet('Test tweet - please ignore, will delete shortly');
        console.log('✅ Write access confirmed!');
        console.log('Tweet ID:', testTweet.data.id);
        
        // Clean up - delete test tweet
        await client.v2.deleteTweet(testTweet.data.id);
        console.log('✅ Test tweet deleted');
        
    } catch (error) {
        console.error('❌ Authentication failed:');
        console.error('Error:', error.message);
        console.error('Code:', error.code);
        
        if (error.code === 401) {
            console.log('\n💡 Troubleshooting:');
            console.log('1. Regenerate access tokens in Twitter Developer dashboard');
            console.log('2. Ensure app permissions are set to "Read and write"');
            console.log('3. Verify all credentials are correct in .env file');
        }
    }
}

testAuth();