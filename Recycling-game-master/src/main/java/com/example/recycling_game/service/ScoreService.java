package com.example.recycling_game.service;
import com.example.recycling_game.model.Score;

import java.util.List;
public interface ScoreService {
    void addScore(Score score);
    List<Score> getScoresByUser(String username);
}
