package com.example.recycling_game.service;
import com.example.recycling_game.model.User;

import java.util.List;
public interface GameService {
    User login(String username, String password);
    User register(User user);
    void updateScore(String username, int score);
    List<User> getRanking();
}
