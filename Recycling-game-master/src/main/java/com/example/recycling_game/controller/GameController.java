package com.example.recycling_game.controller;
import com.example.recycling_game.model.Score;
import com.example.recycling_game.service.ScoreService;
import com.example.recycling_game.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {
    @Autowired
    private ScoreService scoreService;

    @Autowired
    private UserService userService;

    // 게임 시작 시점에 점수를 초기화
    @PostMapping("/start")
    public String startGame(@RequestBody String username) {
        // 게임을 시작하고 필요한 초기화 로직을 수행
        return "게임 시작";
    }

    // 게임 종료 시점에 점수를 저장
    @PostMapping("/end")
    public String endGame(@RequestBody Score score) {
        // 점수 저장 로직
        scoreService.addScore(score);
        return "게임 종료, 점수 저장 완료";
    }

    // 현재 게임 점수 가져오기
    @GetMapping("/score/{username}")
    public List<Score> getScores(@PathVariable String username) {
        return scoreService.getScoresByUser(username);
    }
}
