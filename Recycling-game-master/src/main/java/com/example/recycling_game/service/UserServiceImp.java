package com.example.recycling_game.service;

import com.example.recycling_game.model.Score;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserServiceImp implements UserService {

    @Override
    public List<Score> getTopScores(int limit) {
        // 구현 로직
        return null; // 임시 반환값
    }

    @Override
    public void saveScore(Score score) {
        // 구현 로직
    }

    // 필요한 다른 메서드들의 구현
}