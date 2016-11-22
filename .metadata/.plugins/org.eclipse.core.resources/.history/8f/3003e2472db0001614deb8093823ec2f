package classes;

import java.util.ArrayList;
import java.util.Queue;
import server.MainServer;

public class Channel extends Thread{

    //public int channelID;
    public String clientID;
    public String channelName;
    public String[] channelTags;
    public int numChannelSubscribers;
    public int numChannelLikes;
    public boolean isLive;
    public ArrayList<Song> songPlaylist;

    public String currentSongURI;
    private Integer currentSongPosition;
    private double startTime;
    private double endTime;
    private double totalTimePlayed;

    public Channel( String clientId, String channelName){
        //this.channelID = channelId;
        this.clientID = clientId;
        this.channelName = channelName;
        //		this.channelTags = channelTags;
        //		this.numChannelSubscribers = numSubscribers;
        //		this.numChannelLikes = numlikes;
        this.isLive = false;
        this.songPlaylist = new ArrayList<Song>();
        MainServer.channelIDToChannelMap.put(clientID, this);
        startTime = 0;
        totalTimePlayed = 0;
        endTime = 0;
    }

    public String getClientID(){
        return clientID;

    }
    public boolean isLive() {
        return isLive;
    }

    public void setLive(boolean isLive) {
        this.isLive = isLive;

        if(isLive) {
            this.start();
        }
    }

    public String[] getChannelTags(){
        return channelTags;

    }
    public int getNumChannelSubscribers(){
        return numChannelSubscribers;

    }
    public int getNumChannelLikes(){
        return numChannelLikes;

    }

    public void setClientID(String clientId){
        this.clientID = clientId;

    }
    public void addChannelTags(String [] tags){
        this.channelTags = tags;

    }
    public void setNumChannelSubscribers(int numSubscribes){
        this.numChannelSubscribers=numSubscribes;

    }
    public void setNumChannelLikes(int numLikes){
        this.numChannelLikes = numLikes;

    }

    public void addSongToPlaylist(Song song){
        songPlaylist.add(song);
    }

    public ArrayList<String> getSongURIPlaylist(){
        ArrayList<String> arrSongURI = new ArrayList<String>();
        System.out.println(songPlaylist.size());
        for(int i = 0; i <songPlaylist.size(); i++){

            arrSongURI.add(songPlaylist.get(i).getSongURI());
        }
        return arrSongURI;
    }

    public void setSongURIPlaylist(ArrayList<Song> songs){
       this.songPlaylist = songs;
    }

    public String getChannelName() {
        return channelName;
    }

    public void setChannelName(String channelName) {
        this.channelName = channelName;
    }

    public String getCurrentSongURI() {
        return songPlaylist.get(0).getSongURI();
    }

    public void setCurrentSongURI(String currentSong) {
        this.currentSongURI = currentSong;
    }

    public void changeSong() {
        songPlaylist.remove(0);
        if(!songPlaylist.isEmpty()) {
            startTime = System.nanoTime();
            totalTimePlayed = 0;
        }
    }

    public void playSong() {
        startTime = System.nanoTime();
    }

    public void pauseSong() {
        endTime = System.nanoTime();
        totalTimePlayed += endTime - startTime;
    }

    public Integer getCurrentSongPosition() {
        // TODO Auto-generated method stub
        endTime = System.nanoTime();
        totalTimePlayed += (endTime - startTime);
        return 0;
    }

    public void setCurrentSongPosition(Integer i){
        this.currentSongPosition = i;
    }
}
