package com.example.recycling_game.service;

import com.example.recycling_game.model.Score;
import java.util.List;

public interface UserService {
    List<Score> getTopScores(int limit);
    void saveScore(Score score);
    // 필요한 다른 메서드들을 여기에 추가하세요
}