using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemySpawner : MonoBehaviour
{
    [SerializeField] public GameObject burglar;
    [SerializeField] public GameObject murderer;

    [SerializeField] float timer = 0f;

    //Initial max time to spawn randomly || Change as needed
    [SerializeField] int maxTimeToSpawn = 11;

    // Start is called before the first frame update
    IEnumerator Start()
    {
        while (true)
        {
            yield return StartCoroutine(RandomSpawn());
        }
    }

    // Update is called once per frame
    void Update()
    {
        timer += Time.deltaTime;
        checkedTimeForIncreaseSpawns();
    }

    private void checkedTimeForIncreaseSpawns()
    {
        int time = (int)timer;
        //Every 15 seconds, decrease max time spawn | Change as needed
        if(time % 15 == 0 && maxTimeToSpawn < 1)
        {
            //Change increments of time to spawn enemies | Change as needed
            maxTimeToSpawn -= 2;
        }
    }

    IEnumerator RandomSpawn()
    {
        bool burglarVmurderer = (UnityEngine.Random.value > 0.5f);
        int timeBetweenSpawns = UnityEngine.Random.Range(0, maxTimeToSpawn);
        if (burglarVmurderer)
        {
            GameObject enemy = Instantiate(
                burglar,
                transform.position,
                Quaternion.identity) as GameObject;
        }
        else
        {
            GameObject enemy = Instantiate(
                murderer,
                transform.position,
                Quaternion.identity) as GameObject;
        }
        yield return new WaitForSeconds(timeBetweenSpawns);
    }
}
