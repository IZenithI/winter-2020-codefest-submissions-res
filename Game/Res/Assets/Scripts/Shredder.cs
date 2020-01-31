using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Shredder : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D collision)
    {
        Destroy(collision.gameObject);
        if(collision.name == "Player" || collision.name == "Player(clone)")
        {
            SceneManager.LoadScene("TitleScreen");
        }
    }
}
